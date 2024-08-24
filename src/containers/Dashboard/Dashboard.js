import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import '../../components/Search/Search.css'
import Cards from '../../components/CountBoard/CountBoard'
import EnhancedTable from '../../components/TableView/TableView';
import Toolbar from '../../components/Toolbar/Toolbar'



export const CardContext = React.createContext([1, 0, 0, 0, 0]);
export const CountContext = React.createContext({});
export const LatestCountContext = React.createContext(false);
export const LoanAppContext = React.createContext([]);

const Dashboard = () => {
  const [card, setCard] = useState(JSON.parse(localStorage.getItem('cards') || "[]"));
  const [count, setCount] = useState({});
  const [latestCount, setLatestCount] = useState(false);
  const [rows, setRows] = useState([]);
  const [page2, setPage2] = React.useState(0);
  return (
    <div>
      <LoanAppContext.Provider value={[rows, setRows]}>
        <Toolbar />
        <Divider />
        <CardContext.Provider value={[card, setCard]}>
          <CountContext.Provider value={[count, setCount]}>
            <LatestCountContext.Provider value={[latestCount, setLatestCount]}>
              <Cards setPage2={setPage2} />
              <EnhancedTable setPage2={setPage2} page2={page2} />
            </LatestCountContext.Provider>
          </CountContext.Provider>
        </CardContext.Provider>
      </LoanAppContext.Provider>
    </div >

  );
}

export default Dashboard;
