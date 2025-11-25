
(function(){
  // Quiz content — age-appropriate language for 18–21-year-old associate degree students
  const questions = [
    {
      q: 'You get an email saying: "Your account will be closed in 2 hours. Click here to verify now." The sender is support@secure-login.example-security.com (you bank with ExampleBank). What’s the safest move?',
      opts: [
        'Click the link quickly to keep the account open.',
        'Reply and ask if this is legit.',
        'Ignore it completely; if it were real, they’d call.',
        'Open a new tab and go to ExampleBank’s official site or app yourself to check.'
      ],
      answer: 3,
      explanations: [
        'Rushing is exactly what phishers want. Links can lead to fake login pages.',
        'Replying confirms your address and may start a conversation with the attacker.',
        'Ignoring might be fine, but the best practice is to check through official channels yourself.',
        'Correct. Type the official URL or use the app. Don’t trust links in unexpected emails.'
      ]
    },
    {
      q: 'Which email address looks most like a spoofed (fake) domain trying to look real?',
      opts: [
        'support@paypal.com',
        'support@paypaI.com',
        'support@university.edu',
        'support@paypal-support.com'
      ],
      answer: 1,
      explanations: [
        'This is the real domain format.',
        'Correct. That’s a capital "I" in place of the letter "l" — easy to miss.',
        'A normal higher-ed domain structure.',
        'Could be a third-party domain; always verify, but the lookalike swap in option B is the classic trick.'
      ]
    },
    {
      q: 'A poster on campus has a QR code for a "free antivirus" that asks you to install an app and sign in with your student account. What’s the best response?',
      opts: [
        'Scan it and install; it’s from campus so it’s safe.',
        'Use your phone camera, install the app, then change your password.',
        'Avoid scanning unknown QR codes; use the official IT website/app for security tools.',
        'Send the QR to friends to see if anyone tried it.'
      ],
      answer: 2,
      explanations: [
        'Physical posters can be tampered with. Location doesn’t guarantee safety.',
        'Still risky; installing untrusted apps can steal data.',
        'Correct. Get software only from official sources you navigate to yourself.',
        'Sharing spreads risk and normalizes unsafe behavior.'
      ]
    },
    {
      q: 'You receive an unexpected password reset email that looks real. What should you do first?',
      opts: [
        'Click the reset link to see where it goes.',
        'Delete the email immediately.',
        'Open a new tab, go to the official site, and check your account/security notifications there.',
        'Forward the email to classmates to ask if they got it too.'
      ],
      answer: 2,
      explanations: [
        'Links can redirect to fake pages. Don’t test them.',
        'You might lose a legitimate alert. Verify through official channels first.',
        'Correct. Navigate yourself and check from a trusted entry point.',
        'Forwarding increases risk and spreads the phish.'
      ]
    },
    {
      q: 'You entered your credentials on a site that now seems suspicious. What’s the most important next step?',
      opts: [
        'Wait and see if anything happens.',
        'Change your password on the official site, turn on MFA, and report it to IT/security.',
        'Clear your browser cache and hope for the best.',
        'Post about it on social media to warn others.'
      ],
      answer: 1,
      explanations: [
        'Delaying increases the chance of account takeover.',
        'Correct. Act fast to secure your account and notify the right people.',
        'Cache doesn’t fix credential compromise.',
        'Public posts may expose personal info; report through official channels.'
      ]
    }
  ];

  const qContainer = document.getElementById('questions');
  const form = document.getElementById('quizForm');
  const result = document.getElementById('result');
  const resetBtn = document.getElementById('resetBtn');

  function render(){
    qContainer.innerHTML = '';
    questions.forEach((item, idx) => {
      const qDiv = document.createElement('div');
      qDiv.className = 'question';
      const h = document.createElement('h3');
      h.textContent = `Q${idx+1}. ${item.q}`;
      qDiv.appendChild(h);

      const optsDiv = document.createElement('div');
      optsDiv.className = 'options';
      item.opts.forEach((opt, oi) => {
        const id = `q${idx}_o${oi}`;
        const label = document.createElement('label');
        label.className = 'option';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `q${idx}`;
        input.value = String(oi);
        input.id = id;
        const text = document.createElement('div');
        text.innerHTML = `<strong>Option ${String.fromCharCode(65+oi)}:</strong> ${opt}`;
        label.appendChild(input);
        label.appendChild(text);

        label.addEventListener('change', () => {
          const selected = Number(input.value);
          const correct = selected === item.answer;
          const fb = qDiv.querySelector('.feedback');
          const allLabels = optsDiv.querySelectorAll('.option');
          allLabels.forEach(l => l.classList.remove('correct','incorrect'));
          label.classList.add(correct ? 'correct' : 'incorrect');
          if(fb){ fb.remove(); }
          const feedback = document.createElement('div');
          feedback.className = 'feedback';
          const badge = document.createElement('div');
          badge.className = 'badge ' + (correct ? 'success' : 'error');
          badge.textContent = correct ? '✅ Correct' : '❌ Try again';
          const explain = document.createElement('div');
          explain.className = 'explain';
          explain.textContent = item.explanations[selected];
          feedback.appendChild(badge);
          feedback.appendChild(explain);
          qDiv.appendChild(feedback);
        });

        optsDiv.appendChild(label);
      });

      qDiv.appendChild(optsDiv);
      qContainer.appendChild(qDiv);
    });
  }

  render();

  form.addEventListener('submit', function(ev){
    ev.preventDefault();
    let score = 0;
    questions.forEach((item, idx) => {
      const picked = form.querySelector(`input[name="q${idx}"]:checked`);
      if(picked && Number(picked.value) === item.answer) score++;
    });
    const pct = Math.round((score / questions.length) * 100);
    const passed = pct >= 80; // configurable pass mark
    result.textContent = `You scored ${pct}% (${score}/${questions.length}). ` + (passed ? '✅ Passed' : '❌ Try again');

    // SCORM reporting
    SCORM.set('cmi.core.score.raw', pct);
    SCORM.set('cmi.core.lesson_status', passed ? 'passed' : 'failed');
    SCORM.commit();
  });

  resetBtn.addEventListener('click', () => { render(); result.textContent=''; });
})();
