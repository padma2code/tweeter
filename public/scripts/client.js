
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const renderTweets = function(tweets) {
    return tweets.forEach(tweet => {
      $('#tweets-container').append(createTweetElement(tweet));
    });
  };
  
  const createTweetElement = function(tweetObj) {
    const element = `
      <article class="tweet">
      <header>
        <div class="wrapper">
          <img src=${tweetObj.user.avatars} />
          <span class="name">${tweetObj.user.name}</span>
        </div>
        <span class="handle">${tweetObj.user.handle}</span>
      </header>
      <div class="content">
          ${tweetObj.content.text}
      </div>
      <footer>
        <span class="date">
        ${tweetObj.created_at}
        </span>
        <div class="actions">
          <img src="/images/flag.png">
          <img src="/images/retweet-symbol.png">
          <img src="/images/like-symbol.png">
        </div>
      </footer>
      </article>
    `;
    return element;
  }
  
  const loadTweets = (url, method, cb) => {
    $.ajax({
      url,
      method,
    })
      .done(data => {
        cb(data);
      })
      .fail(err => {
        console.log('Error:', err)
      })
      .always( () => {
        console.log("Tweets loaded!");
      });
  };
  
  $(document).ready(function() {
    loadTweets("/tweets", "GET", renderTweets);
  
    $("form").on("submit", function() {
      event.preventDefault();
      console.log('Performing AJAX request...')
      const $data = $(this).serialize()
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $data
      })
        .done( (data) => {
          console.log('Success!');
          console.log(data);
        })
        .fail( (err) => {
          console.log("Error:", err);
        })
        .always( () => {
          console.log("Done!")
        });
    });
  });