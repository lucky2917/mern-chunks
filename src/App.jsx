import Api1 from'./react-node-API/api1.jsx'
import Api2 from'./react-node-API2/api2.jsx'
import Mocklogin from'./local-auth/mocklogin.jsx'
import Api3 from './react-node-API3/api3.jsx';
import Testimonials from './testimonials-CRUD/Testimonials.jsx';
function App() {
  return(
    <div>
      <h1>Day 1.1 - click button set the data from server using cors</h1>
      <Api1 />
      <h2>Day 1.2</h2>
      <Api2 />
      <h2>Day 1.3</h2>
      <Mocklogin />
      <h2>Day 2.1</h2>
      <Api3 />
      <h2>Day 3.2</h2>
      <Testimonials />
    </div>
    
  );
}

export default App
