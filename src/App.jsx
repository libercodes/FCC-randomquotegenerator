import React from 'react';
import './App.css';
import { async } from 'q';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state  = {selectedQuote: '', selectedAuthor: ''}
  }
  async componentDidMount(){
    let response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
    let values = await response.json();
    let quoteList = values.quotes;
    this.setState({quoteList: quoteList});
    console.dir(this.state.quoteList)

    this.handleClick();
  }
  getRandomQuote = () =>{
    let index = Math.floor(Math.random() * 102);
    console.log(index);
    console.log('quote: ' + this.state.quoteList[index].quote);
    console.log('author: ' + this.state.quoteList[index].author);
    return {
      quote: this.state.quoteList[index].quote,
      author: this.state.quoteList[index].author
    }
  }
  handleTweet = () => {
    let url = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + this.state.selectedQuote + '" ' +  this.state.selectedAuthor)
    window.open(url, '_blank');
  }
  handleClick = () => {
    let quote = this.getRandomQuote();
    this.setState({selectedQuote: this.getRandomQuote().quote, selectedAuthor: this.getRandomQuote().author})

  }

  render(){

    return(
      <div id="quote-box">
          <div id="container">
              <h1 id="text">{this.state.selectedQuote}</h1>
              <h3 id="author">- {this.state.selectedAuthor}</h3> 
          </div>
          <button id="new-quote" onClick={this.handleClick}>Get a quote</button>
          <a id="tweet-quote" onClick={this.handleTweet} href="twitter.com/intent/tweet"><button className="btn">Tweet</button></a>
      </div>
    );
  }

}

export default App;
