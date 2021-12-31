import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Gs from './theme/globalStyles';

// import components
import Header from './component/header'
import Footer from './component/footer'
import Marketplace from './pages/marketplace'
import NotFound from './pages/not.found'
import NFTList from './pages/nft-list'
import Activity from './pages/activity'
import MyProfile from './pages/my-profile'

function App() { 

  const Loading = () => {
    return (<>Loading</>)
  }
  
  return (
    <Router >
      <Suspense fallback={<Loading />}>
          <section className='MainBox clearfix'>
            <Gs.GlobalStyle /> 
            <Header />
              <Switch>
                <Route path="/" exact> <Marketplace />  </Route>
                <Route path="/marketplace" > <Marketplace /> </Route>
                <Route path="/nft-list"><NFTList /></Route>
                <Route path="/activity"><Activity /></Route>
                <Route path="/my-profile"><MyProfile /></Route>
                <Route component={NotFound} />
              </Switch>    
            <Footer />
          </section>
        <ToastContainer autoClose={8000} 
          theme={'colored'} 
          position='bottom-left'
          pauseOnHover />
      </Suspense>
    </Router>
  );
}


export default App;