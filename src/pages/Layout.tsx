
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, NavLink } from "react-router-dom";

import styled from "styled-components";

import '../assets/styles/App.css';

import ResponsiveAppBar from "../components/navigation/ResponsiveAppBar";
import SimpleBottomNavigation from "../components/navigation/SimpleBottomNavigation";

import FractalCanvas from '../components/FractalCanvas';


export const Header = (props: any) => {
    return (
        <div id="header">

            {/* <span className="d-none d-light-inline">Try this website on dark mode.</span> */}
            {/* <span className="d-none d-dark-inline">Thank you for saving your eyes in dark mode.</span> */}
            {/* <span className="d-no-preference-none d-dark-none d-light-none">Your browser is old!</span> */}

            <ResponsiveAppBar {...props} />
        </div>
    )
}


export const Footer = (props: any) => {
    return (
        <div id="footer">
            <SimpleBottomNavigation />
        </div>
    )
}


export const Layout = (props: any) => {
    return (
        <div className="Layout">
            <Header {...props}/>

            <Outlet />
        </div>
    )
}


export default Layout;

