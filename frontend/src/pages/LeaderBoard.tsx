import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Td,
    Tbody,
    Th,
    Tr,
    Thead,
    Table,
    TableContainer
} from '@chakra-ui/react'
import { IUser } from "../types/auth.types";
import { getUsersApi } from "../store/auth.api";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../store/store";

const Leaderboard = () => {
  const { allUsers, loading } = useSelector((store: RootState) => store.authManager);
  const dispatch = useDispatch<ThunkDispatch<any, null, AnyAction>>();

  useEffect(() => {
    dispatch(getUsersApi());
  }, []);

  if(allUsers)allUsers.sort((a:IUser, b: IUser) => b.points - a.points);

  if(loading)return <div style={{textAlign:'center',fontSize:25,fontWeight:'bold'}}>Loading...</div>

  return (
    <div>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Name</Th>
              <Th>Points</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allUsers?.map((el:IUser, i: number) => (
              <Tr key={el._id}>
                <Td>{i + 1}</Td>
                <Td>{el.name}</Td>
                <Td>{el.points}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Leaderboard;