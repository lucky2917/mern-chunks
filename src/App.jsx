import Api1 from'./day1.1/api1.jsx'
import Api2 from'./day1.2/api2.jsx'
import Mocklogin from'./day1.3/mocklogin.jsx'
import Api3 from './day2.1/api3.jsx';
import Testimonials from './day3.2/Testimonials.jsx';
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
