import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import '../../components/Search/Search.css'
import Cards from '../../components/CountBoard/CountBoard'
import EnhancedTable from '../../components/EnhancedTable/EnhancedTable';
import useStyles from '../../components/Search/SearchStyles'
import Toolbar from '../../components/Toolbar/Toolbar'



export const CardContext = React.createContext([1, 0, 0, 0, 0]);
export const CountContext = React.createContext({});

const Dashboard = () => {
  const [card, setCard] = useState([1, 0, 0, 0, 0]);
  const [count, setCount] = useState({});

  const classes = useStyles();
  return (
    <div>
      <Toolbar />
      <Divider />
      <CardContext.Provider value={[card, setCard]}>
        <CountContext.Provider value={[count, setCount]}>
          <Cards />
          <EnhancedTable />
        </CountContext.Provider>
      </CardContext.Provider>
    </div>

  );
}

export default Dashboard;
