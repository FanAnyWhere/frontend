import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './component/header'
import Marketplace from './pages/marketplace' 
import Gs from './theme/globalStyles';

import Footer from './component/footer';

function App() { 

  
  return (
    <Router basename={'home'} >
      <section className='MainBox clearfix'>
        <Gs.GlobalStyle /> 
          <Header />  
          <Switch>
            <Route path="/" exact> <Marketplace />  </Route>  
          </Switch>   
          <Footer />
        </section>
    </Router>

  );
}


export default App;