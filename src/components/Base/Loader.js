import React, {Component} from "react";

export default class Loader extends Component{

    constructor(params){
        super(params);
        this.state = {
            show: true
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({show: nextProps.show});
    }

    render() {
        return (
            <span className="spinner">
                {
                    this.state.show && <svg width="150px"  height="150px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-double-ring"><circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" strokeLinecap="round" r="40" strokeWidth="4" stroke="#bd4030" strokeDasharray="62.83185307179586 62.83185307179586" transform="rotate(328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="3.3s" begin="0s" repeatCount="indefinite"></animateTransform></circle><circle cx="50" cy="50" ng-attr-r="{{config.radius2}}" ng-attr-stroke="{{config.c2}}" fill="none" strokeLinecap="round" r="35" strokeWidth="4" stroke="#e0b83e" strokeDasharray="54.97787143782138 54.97787143782138" strokeDashoffset="54.97787143782138" transform="rotate(-328.301 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50" keyTimes="0;1" dur="2s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>
                }
            </span>
        )
    }
 }