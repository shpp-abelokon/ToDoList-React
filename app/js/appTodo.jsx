const DATA = ["Выучить React", "Выучить Angular", "Выучить Emberjs"];
const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

const ItemTodo = React.createClass({

    render: function (){
        const { todoText } = this.props;
        return (
            <div>
                <li className="item">
                    <input className='toggle-all' type='checkbox'/>
                    <span > { todoText }</span>
                </li>
            </div>
        );
    }
});

const ListTodo = React.createClass({

    render: function () {
        const todos = this.props.data.map((todo, i) =>
            <ItemTodo
                todoText={ todo } key={ i }
            />
        );
        return (
            <div>
                <div id="content" className="col-lg-6 col-lg-offset-3">
                    <section className='main'>
                        <ul>
                            {todos}
                        </ul>
                    </section>
                </div>
            </div>
        );
    }
});

const InputTodo = React.createClass({
    render: function (){
        return (
            <div id="header-input" className="col-lg-6 col-lg-offset-3">
                <input type="text" className="form-control" placeholder="Text input" onKeyUp={this.props.onInputText}/>
            </div>
        );
    }
});

const AppTodo = React.createClass({
    getInitialState(){
        return {
            displayedTodos: this.props.data
        };
    },
    inputText(e){
        if (e.keyCode != ENTER_KEY) {
            return;
        }
        event.preventDefault();
        let v = e.target.value;
        console.log(e.keyCode);
        const myTodos = this.props.data;
        myTodos.push(v);
        console.log(myTodos);
        this.setState({
            displayedTodos: myTodos
        });
    },
    render: function () {
        return (
            <div>
                <InputTodo onInputText={this.inputText} />
                <ListTodo data={this.state.displayedTodos}/>

            </div>
        );
    }
});


ReactDOM.render(<AppTodo data={DATA} />, document.querySelector("#main"));
