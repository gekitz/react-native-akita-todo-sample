import {ID} from "@datorama/akita";
import * as React from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Button,
    TextInput,
    TouchableHighlight
} from "react-native";
import {Subject} from "rxjs";
import {Todo, todosQuery, todosService} from "../models/state";

interface TodoComponentProp {
    todo: Todo
    remove: (id: ID) => void
}
export class TodoComponent extends React.Component<TodoComponentProp> {
    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <TouchableHighlight onPress={() => {
                this.props.remove(this.props.todo.id);
            }}>
                <View style={todoCellStyleSheet.cell}>
                    <Text style={todoCellStyleSheet.cellText}>{this.props.todo.text}</Text>
                    <View style={todoCellStyleSheet.cellSeparator}/>
                </View>
            </TouchableHighlight>
        );
    }
}

interface TodosComponentProps {
    todos: Todo[]
    remove: (id: ID) => void
}
export class TodosComponent extends React.Component<TodosComponentProps> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        console.log("Render DataSource:", this.props.todos);
        return (
            <FlatList style={todosPageStyleSheet.list}
                      data={this.props.todos}
                      renderItem={({item}) => <TodoComponent todo={item} remove={this.props.remove}/>}
            />
        )
    }
}

interface TodosPageState {
    todos: Todo[]
    inputText: string
}
export class TodosPageComponent extends React.Component<any, TodosPageState> {
    private destroyer: Subject<void> = new Subject<void>();

    constructor(props: any) {
        super(props);
        this.state = {todos: [], inputText: ""}
    }

    componentDidMount(): void {
        todosQuery.selectVisibleTodos$
            .subscribe((todos: Todo[]) => {
                this.setState({todos})
            })
    }

    componentWillUnmount(): void {
        this.destroyer.next();
    }

    add(): void {
        this.setState({inputText: ""});
        todosService.addTodo(this.state.inputText);
    }

    remove(id: ID): void {
        todosService.removeTodo(id);
    }

    updateText(inputText: string): void {
        this.setState({inputText})
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        console.log("Render:", this.state.todos);
        return (
            <View style={todosPageStyleSheet.container}>
                <View style={todosPageStyleSheet.textInputContainer}>
                    <TextInput
                        style={todosPageStyleSheet.textInput}
                        value={this.state.inputText}
                        selectionColor={todosPageStyleSheet.textInput.color}
                        onChangeText={text => { this.updateText(text) }}
                        onSubmitEditing={() => { this.add() }}
                    />
                </View>
                <Button
                    title={"Add"}
                    disabled={this.state.inputText.length === 0}
                    onPress={() => { this.add()}} />
                <TodosComponent todos={this.state.todos} remove={(id: ID) => {
                    this.remove(id);
                }}/>
            </View>
        )
    }
}

const todosPageStyleSheet = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
    },
    textInputContainer: {
        backgroundColor: '#FFFFFF3F',
        borderRadius: 4,
        marginLeft: 14,
        marginRight: 14,
    },
    textInput: {
        height: 44,
        padding: 7,
        color: '#FFFFFF',
        borderRadius: 4,
    },
    addButton: {
        marginTop: 7,
        marginBottom: 7
    }
});

const todoCellStyleSheet = StyleSheet.create({
    cell: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        minHeight: 40,
    },
    cellText: {
        padding: 14,
    },
    cellSeparator: {
        backgroundColor: '#333333',
        height: 1,
        marginLeft: 14
    }
});
