import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components';
import Gs from './theme/globalStyles'
import LoaderGIF from './assets/images/loader.gif'

// import components
import Header from './component/header'
import Footer from './component/footer'
const Marketplace = React.lazy(() => import('./pages/marketplace'))
const NotFound = React.lazy(() => import('./pages/not.found'))
const NFTList = React.lazy(() => import('./pages/nft-list'))
const Activity = React.lazy(() => import('./pages/activity'))
const MyProfile = React.lazy(() => import('./pages/my-profile'))
const EditProfile = React.lazy(() => import('./pages/edit-profile'))

function App() {

  const Loading = () => {
    return (<Loader>
      <img src={LoaderGIF} alt='' />
    </Loader>)
  }

  return (
    <Router basename={'np/fanAnyWhere'}>
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
            <Route path="/edit-profile"><EditProfile /></Route>
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

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content:center; flex-wrap:wrap;
`;

const Loader = styled(FlexDiv)`
  height:100vh;
`;


export default App;