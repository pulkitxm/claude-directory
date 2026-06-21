/* Builds the two "Made with Gnomie" avatar/landscape marquees. */
(function () {
  var social =
    '<span class="pc-social">' +
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.18-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38a3.7 3.7 0 0 1-1.38.9c-.42.16-1.05.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.18-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.05-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.18.25-1.8.41-2.23.22-.56.48-.96.9-1.38a3.7 3.7 0 0 1 1.38-.9c.42-.16 1.05-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4Zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3Zm6.85-11.15a1.54 1.54 0 1 0 1.54 1.54 1.54 1.54 0 0 0-1.54-1.54Z"/></svg>' +
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05A4.28 4.28 0 0 0 11.5 8.5c0 .34.04.67.1.99A12.14 12.14 0 0 1 3 4.8a4.27 4.27 0 0 0 1.32 5.7 4.2 4.2 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.19 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97A8.6 8.6 0 0 1 2 19.54 12.1 12.1 0 0 0 8.56 21.5c7.88 0 12.2-6.53 12.2-12.2v-.56A8.7 8.7 0 0 0 22.46 6Z"/></svg>' +
    '</span>';

  var rows1 = [
    ['garden-15.jpg', 'Amy Lawrence', 'Atlanta, GA'],
    ['garden-89.jpg', 'Jane Doe', 'Los Angeles, CA'],
    ['garden-95.jpg', 'Alice Doe', 'Chicago, IL'],
    ['garden-98.jpg', 'Alex Woltman', 'San Francisco, CA'],
    ['garden-106.jpg', 'John Smith', 'Seattle, WA'],
    ['garden-110.jpg', 'Jane Smith', 'Portland, OR'],
    ['garden-112.jpg', 'Alice Smith', 'Denver, CO'],
    ['garden-253.jpg', 'Alex Doe', 'Austin, TX'],
    ['garden-701.jpg', 'John Woltman', 'Houston, TX']
  ];
  var rows2 = [
    ['garden-206.jpg', 'Michael Thompson', 'Phoenix, AZ'],
    ['garden-33.jpg', 'Sophia Turner', 'Orlando, FL'],
    ['garden-59.jpg', 'Oliver Smith', 'Nashville, TN'],
    ['garden-71.jpg', 'Emily Davis', 'Dallas, TX'],
    ['garden-89.jpg', 'Liam Johnson', 'Charlotte, NC'],
    ['garden-95.jpg', 'Isabella Martinez', 'San Diego, CA'],
    ['garden-98.jpg', 'Noah Brown', 'Columbus, OH'],
    ['garden-106.jpg', 'Ava Wilson', 'Las Vegas, NV'],
    ['garden-110.jpg', 'Lucas Garcia', 'Baltimore, MD']
  ];

  function card(r) {
    return (
      '<div class="proof-card">' +
      '<img class="pc-img" src="assets/img/' + r[0] + '" alt="' + r[1] + '" loading="lazy" />' +
      '<div class="pc-meta"><div><div class="pc-name">' + r[1] + '</div><div class="pc-loc">' + r[2] + '</div></div>' + social + '</div>' +
      '</div>'
    );
  }
  function fill(id, rows) {
    var el = document.getElementById(id);
    if (!el) return;
    var html = rows.map(card).join('');
    el.innerHTML = html + html; /* duplicate for seamless loop */
  }
  fill('marquee1', rows1);
  fill('marquee2', rows2);
})();
