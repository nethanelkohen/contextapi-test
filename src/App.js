import React, { Component } from 'react';

// first we will make a new context
const MyContext = React.createContext('default');

// Then create a provider Component
class MyProvider extends Component {
  state = {
    name: 'Nate',
    age: 100,
    cool: true
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          increment: () =>
            this.setState(prevState => {
              return { age: prevState.age + 1 };
            }),
          changeName: inputFromChild => {
            this.setState({
              name: inputFromChild
            });
          }
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

const Family = props => (
  <div className="family">
    <Person />
  </div>
);

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }
  render() {
    let { input } = this.state;
    return (
      <div className="person">
        <MyContext.Consumer>
          {context => (
            <React.Fragment>
              <p>Age: {context.state.age}</p>
              <button onClick={context.increment}>+</button>
              <p>Name: {context.state.name}</p>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  context.changeName(input);
                  // option b: remove function from onSubmit
                }}
              >
                <input
                  type="text"
                  value={this.state.value}
                  onChange={e => this.setState({ input: e.target.value })}
                  // option b: onChange={e => context.changeName(e.target.value)}
                />
                <button type="submit">Change Name</button>
              </form>
            </React.Fragment>
          )}
        </MyContext.Consumer>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <MyProvider>
        <div>
          <p>I am the app</p>
          <Family />
        </div>
      </MyProvider>
    );
  }
}

export default App;
