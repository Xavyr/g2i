import React, { Component } from 'react';
import HomePage from '../components/HomePage.jsx';
import TriviaContainer from './TriviaContainer.jsx';
import AnswersContainer from './AnswersContainer.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../action/actions'


const mapStateToProps = (store) => {
  return {
    gameBegun: store.firstReducer.gameBegun,
    loadedQuestions: store.firstReducer.loadedQuestions,
    chosenAnswer: store.firstReducer.chosenAnswer,
    answeredQuestions: store.firstReducer.answeredQuestions
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    beginGame: actions.beginGame,
    chosen: actions.chosen
  }, dispatch)
};


class App extends Component {

  componentDidMount() {

  }

  render() {
    const renderSwitch = () => {
      if(this.props.answeredQuestions.length === 10) {
        console.log('answerQuestions?', this.props.answeredQuestions);
        return <AnswersContainer
          answeredQuestions={this.props.answeredQuestions}
        />
      }
      if(!this.props.gameBegun) {
        return <HomePage
          beginGame={this.props.beginGame}
          gameBegun={this.props.gameBegun}
          asyncAction={this.props.asyncAction}
          asyncData={this.props.asyncData}
        />
      }
      if(this.props.gameBegun) {
        return <TriviaContainer
          loadedQuestions={this.props.loadedQuestions}
          chosen={this.props.chosen}
        />
      }
    }

    console.log('in App, current state of game', this.props);
    return (
      <div>
        {renderSwitch()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);