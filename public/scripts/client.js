
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//function to render all objects in Array
const renderTweets = function(tweets) {
    return tweets.forEach(tweet => {
      $('#tweets-container').append(createTweetElement(tweet));
    });
  };
  //function to create HTMl article dynamically
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
  //function to load tweets from server using Ajax
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
  // function to validate form submission
  const submitHandler = (text) => {
    if (!text) {
      return alert("Your tweet is empty");
    } else if (text.length > 140) {
      return alert(`Your tweet is too long: ${text.length} characters`)
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: {
          text
        }
      })
        .done( () => {
          console.log('Success!');
        })
        .fail( (err) => {
          console.log("Error:", err);
        })
        .always( () => {
          console.log("Done!")
        });
    };
  };
  
  $(document).ready(function() {
    loadTweets("/tweets", "GET", renderTweets);
  
    $("form").on("submit", function() {
      event.preventDefault();
      console.log('Performing AJAX request...');
      // submitHandler($(this).serialize());
      submitHandler($('textarea').val());
    });
  });