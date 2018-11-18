import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
};

class App extends Component {
  constructor(props) {
	  super(props);
	  const newNumber = ()=>Math.floor(Math.random()*100-50);
	  this.state = {
		a: newNumber(),
		b: newNumber(),
		genNum:0,
		level:0,
		levels:[0]
	  };
	  const createLevels = (level) => {
		const levels = [];
		for(let l = 0 ; l <= level ; ++l) {
			levels.push(l);
		}
		shuffle(levels);
		return levels;
	  }
	  this.next = ()=>{
		  const newState = {};
		  if(this.state.genNum == this.state.level) {
			newState.genNum = 0;
			newState.a = newNumber();
			newState.b = newNumber();
			newState.levels = createLevels(this.state.level);
		  } else {
			  newState.genNum = this.state.genNum + 1;
		  }
		  this.setState(newState);
	  };
	  this.levelUp = () => {
		  const nextLevel = this.state.level+1;
		  this.setState({
			  level:nextLevel,
			  genNum : 0,
			  a : newNumber(),
			  b : newNumber(),
			  levels:createLevels(nextLevel)
		});
	};
  }
  render() {
	const {a,b,advanced,level,genNum,levels} = this.state;
	const pm = (x) => x>0?'+':'-';
	const abs = (x) => x>0?x:-x;
	const m = (x) => x>0?'-':'';
	const genStyle = {fontWeight:'bold', display:'inline-block'};
	const gen = [
		() => <div style={genStyle}>x {pm(a)} {abs(a)} = {b}</div>,
		() => <div style={genStyle}>{a} + x = {b}</div>,
		() => <div style={genStyle}>x {pm(-b)} {abs(b)} = {m(a)}{abs(a)}</div>,
		() => <div style={genStyle}>{m(b)}{abs(b)} + x = {m(a)}{abs(a)}</div>,
		() => <div style={genStyle}>{b} = x {pm(a)} {abs(a)}</div>,
		() => <div style={genStyle}>{b} = {a} + x</div>,
		() => <div style={genStyle}>{m(a)}{abs(a)} = x {pm(-b)} {abs(b)}</div>,
		() => <div style={genStyle}>{m(-a)}{abs(a)} = {m(-b)}{abs(b)} - x</div>,
		() => <div style={genStyle}> -x {pm(-a)} {abs(a)}= {m(b)}{abs(b)}</div>,
		() => <div style={genStyle}>{m(a)}{abs(a)} - x = {m(b)}{abs(b)}</div>,
		() => <div style={genStyle}>-x {pm(b)} {abs(b)} = {m(-a)}{abs(a)}</div>,
		() => <div style={genStyle}>{m(-b)}{abs(b)} - x = {m(-a)}{abs(a)}</div>,
		() => <div style={genStyle}>{m(-b)}{abs(b)} = -x {pm(-a)} {abs(a)}</div>,
		() => <div style={genStyle}>{m(b)}{abs(b)} = {m(a)}{abs(a)} - x</div>,
		() => <div style={genStyle}>{m(-a)}{abs(a)} = -x {pm(b)} {abs(b)}</div>,
		() => <div style={genStyle}>{m(-a)}{abs(a)} = {m(-b)}{abs(b)} - x</div>
	];
	const showLevelUp = level < 15;
    return (
		<div style={{position:'absolute',left:0,right:0,bottom:0,top:0}}>
			<div style={{position:'absolute',left:0,top:0}}>Level {level} ; Gen {genNum}</div>
			<div style={{position:'absolute',left:0,right:0,bottom:0}}>
				{showLevelUp?<button onClick={this.levelUp} style={{width:'50%',height:'30px'}}>Level up</button>:null}
				<button onClick={this.next} style={{width:showLevelUp?'50%':'100%',height:'30px'}}>Next</button>
			</div>
			<div style={{height:'100%',verticalAlign:'middle', textAlign:'center'}}>
				<div style={{height:'100%',width:0,visibility:'hidden',verticalAlign:'middle',display:'inline-block'}} />
				<div style={{display:'inline-block'}}>{gen[levels[genNum]]()}</div>
			</div>
			
		</div>
    );
  }
}

export default App;
