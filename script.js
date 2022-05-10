const projectName = 'random-quote-generator';
let quotesData;

let currentQuote = '',
    currentAuthor = '';

const getQuotes = () => {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/awesomeness-a/a83dfbc7c104e6a2d098bc4ce7d5291b/raw/fb961d2a5ed9a127cafe858ee95c8efad548cdbe/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData');
        console.log(quotesData);
      }
    }
  });
};

const getRandomQuote = () => {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
};

const getQuote = () => {
  let randomQuote = getRandomQuote();
  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;
  
  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );
  
  $('#fb-quote').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=#url=' + encodeURIComponent(currentAuthor) + '&content=' + encodeURIComponent(currentQuote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
  );
  
  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(randomQuote.quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(randomQuote.author);
  });
  
};

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });
  $('#new-quote').on('click', getQuote);
});
