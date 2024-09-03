import {React,useState} from 'react'

import Hero from './Hero'
import Arrays from './Arrays'
import Trees from './Trees'
import Graph from './Graph'
import Dp from './Dp'
import Greedy from './Greedy'
import Linkedlist from './Linkedlist'
import  Stack from './Stack'
import  Top100 from './Top100'
import Hashing from './Hashing'
import Twopointer from './Twopointer'
import Window from './Window'
import Searching from './Searching'
import Sorting from './Sorting'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Login'
import QuestionDetail from './QuestionDetail'
import About from './About'
import Courses from './Courses'
import Register from './Register'
import Contact from './Contact'
import Recursion from './Recursion'
const Home = () => {
 
  return (
    
    <div>
    
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero/>}/>
          <Route path="/questions/:id" element={<QuestionDetail/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/recursion" element={<Recursion/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/arrays" element={<Arrays/>}/>
          <Route path="/dp" element={<Dp/>}/>
          <Route path="/graph" element={<Graph/>}/>
          <Route path="/linked-list" element={<Linkedlist/>}/>
          <Route path="/sorting" element={<Sorting/>}/>
          <Route path="/searching" element={<Searching/>}/>
          <Route path="/stack-and-queues" element={<Stack/>}/>
          <Route path="/trees" element={<Trees/>}/>
          <Route path="/sliding-window" element={<Window/>}/>
          <Route path="/two-pointer" element={<Twopointer/>}/>
          <Route path="/top100" element={<Top100/>}/>
          <Route path="/hashing" element={<Hashing/>}/>
          <Route path="/greedy" element={<Greedy/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/courses" element={<Courses/>}/>
        </Routes>
        </BrowserRouter>
      
    </div>
  )
}

export default Home