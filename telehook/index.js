// YourMood Telegram notifier (Cloudflare Worker) — ASCII only

export default {
  async fetch(request, env, ctx) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors() });
    }
    // Only POST allowed
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: cors() });
    }

    // Ensure secrets exist
    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return new Response('Server not configured: missing secrets', { status: 500, headers: cors() });
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response('Bad Request: invalid JSON', { status: 400, headers: cors() });
    }

    // Format time in KST
    const now = new Date();
    const kst = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(now);

    function esc(s) {
      const x = String(s == null ? '' : s);
      return x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Build message text using simple arrays (ASCII only)
    let text = '';
    if (body.event === 'login') {
      text = [
        '<b>[LOGIN] YourMood</b>',
        '• Time (KST): ' + esc(kst),
        '• Username: ' + esc(body.username || '(none)'),
        '• UID: <code>' + esc(body.uid || '') + '</code>'
      ].join('\n');
    } else if (body.event === 'mood') {
      const m = body.mood || {};
      const tags = Array.isArray(m.tags) ? m.tags.join(', ') : '';
      text = [
        '<b>[NEW LOG] YourMood</b>',
        '• Time (KST): ' + esc(kst),
        '• Username: ' + esc(body.username || '(none)'),
        '• UID: <code>' + esc(body.uid || '') + '</code>',
        '• Day: ' + esc(m.dayId || ''),
        '• Mood: ' + esc(m.emoji || ''),
        '• Tags: ' + esc(tags),
        '• Note: ' + esc(m.note || '')
      ].join('\n');
    } else {
      return new Response('Bad Request: unknown event', { status: 400, headers: cors() });
    }

    const telegramURL = 'https://api.telegram.org/bot' + env.TELEGRAM_BOT_TOKEN + '/sendMessage';
    const payload = {
      chat_id: env.TELEGRAM_CHAT_ID,
      text: text,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    };

    const resp = await fetch(telegramURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const err = await resp.text();
      return new Response('Telegram error: ' + err, { status: 502, headers: cors() });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: Object.assign({ 'Content-Type': 'application/json' }, cors())
    });
  }
};

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}
