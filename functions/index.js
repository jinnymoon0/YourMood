  if (!botToken || !chatId) {
    return res.status(500).send('Server not configured: missing telegram.bot_token or telegram.chat_id');
  }

  let body = {};
  try {
    body = req.body || {};
  } catch (e) {
    return res.status(400).send('Bad Request: invalid JSON');
  }

  // KST time
  const now = new Date();
  const kst = now.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', hour12: false });

  function esc(s) {
    const x = String(s == null ? '' : s);
    return x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

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
    return res.status(400).send('Bad Request: unknown event');
  }

  const url = 'https://api.telegram.org/bot' + botToken + '/sendMessage';
  const payload = {
    chat_id: chatId,
    text: text,
    parse_mode: 'HTML',
    disable_web_page_preview: true
  };

  try {
    const t = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!t.ok) {
      const err = await t.text();
      return res.status(502).send('Telegram error: ' + err);
    }
    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).send(String(e));
  }
});

