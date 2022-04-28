
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, NavLink } from "react-router-dom";

import styled from "styled-components";

import '../assets/styles/App.css';

import ButtonAppBar from "../components/navigation/ButtonAppBar" ;
import ResponsiveAppBar from "../components/navigation/ResponsiveAppBar";
import SimpleBottomNavigation from "../components/navigation/SimpleBottomNavigation";

import FractalCanvas from '../components/FractalCanvas';


export const Header = () => {
    return (
        <ResponsiveAppBar />
    )
}


export const Footer = () => {
    return (
        <SimpleBottomNavigation />
    )
}


export const Layout = () => {
    return (
        <div className="Layout">
            <Header />

            <Outlet />
        </div>
    )
}


export default Layout;

