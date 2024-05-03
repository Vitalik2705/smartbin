import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import BinList from "./components/BinList";
import AdditionalServiceList from "./components/AdditionalServiceList";
import UserAdditionalServiceList from "./components/UserAdditionalServiceList";
import UserBinList from "./components/UserBinsList";
import MessageList from "./components/MessageList";
import BinDetails from "./components/BinDetails";
import About from "./components/About";
import UserProfile from "./components/UserProfile";
import UsefulAdvices from "./components/UsefulAdvices";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/bins" element={<BinList/>}/>
                    <Route path="/additional-services" element={<AdditionalServiceList/>}/>
                    <Route path="/user-additional-services" element={<UserAdditionalServiceList/>}></Route>
                    <Route path="/user-bins" element={<UserBinList/>}></Route>
                    <Route path="/messages" element={<MessageList/>}></Route>
                    <Route path="/bins/:id" element={<BinDetails/>}/>
                    <Route path="/about" element={<About />}/>
                    <Route path="/profile" element={<UserProfile />}/>
                    <Route path="/useful-advices" element={<UsefulAdvices />}/>
                </Route>
            </>
        ))


    return (
        <RouterProvider router={router}/>
    );
}

export default App;
