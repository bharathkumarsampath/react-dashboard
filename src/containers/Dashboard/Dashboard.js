import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import '../../components/Search/Search.css'
import Cards from '../../components/CountBoard/CountBoard'
import EnhancedTable from '../../components/EnhancedTable/EnhancedTable';
import Toolbar from '../../components/Toolbar/Toolbar'



export const CardContext = React.createContext([1, 0, 0, 0, 0]);
export const CountContext = React.createContext({});
export const LatestCountContext = React.createContext(false);
export const LoanAppContext = React.createContext([]);

const Dashboard = () => {
  const [card, setCard] = useState([1, 0, 0, 0, 0]);
  const [count, setCount] = useState({});
  const [latestCount, setLatestCount] = useState(false);
  const [rows, setRows] = useState([]);
  return (
    <div>
      <LoanAppContext.Provider value={[rows, setRows]}>
        <Toolbar />
        <Divider />
        <CardContext.Provider value={[card, setCard]}>
          <CountContext.Provider value={[count, setCount]}>
            <LatestCountContext.Provider value={[latestCount, setLatestCount]}>

              <Cards />
              <EnhancedTable />
            </LatestCountContext.Provider>
          </CountContext.Provider>
        </CardContext.Provider>
      </LoanAppContext.Provider>
    </div >

  );
}

export default Dashboard;
