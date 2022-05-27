import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";




function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>

      <Routes>
        <Route path=":id" element={<About />} />
      
      </Routes>
    </div>
  );
}



function Test(){
    return (
        <div>

          <div>
            <nav>
              <ul>
                <li>
                <BrowserRouter>
                <Link to="/users">Home</Link>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="users/*" element={<Users />} />
                  </Routes>
                </BrowserRouter>    

                </li>
              </ul>
            </nav>
            

        
           
          </div>

      </div>

      );
}


export default Test;