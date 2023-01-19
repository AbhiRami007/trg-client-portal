import React, { useEffect, useState } from "react";
import notFound from '../../assets/images/background/notFound.png'
import {
  getUserDataById,
  getUserDataByIds,
  getUserDocuments,
  updateUser,
} from "../../requests/Auth";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/images/icons/blank.png";
import { Table } from "react-bootstrap";

function CandidateList(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [docs, setDocs] = useState([]);
  let ids = localStorage.getItem("ids");
  const userId = JSON.parse(localStorage.getItem("user-information")).userId;
  useEffect(() => {
    const getUser = async () => {
      if (ids) {
        await updateUser(userId, { candidates: [ids] });
      } else {
debugger
        const user = await getUserDataById(userId);
        ids = user ? user.data.data.candidates : " ";
      }
      if (ids) {
        const res = await getUserDataByIds(ids);
        res && setUser(res.data.data.rows);
        const docs = await getUserDocuments(ids);
        docs && setDocs(docs.data.data.rows);
        localStorage.setItem("userData", JSON.stringify(res.data.data.rows));
        localStorage.setItem("userDocs", JSON.stringify(docs.data.data.rows));
      }
    };
    getUser();
  }, []);

  return (
    <>
      {user.length>0?<div className="row ">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Candidates List</h4>
              <div className="table-responsive">
                <Table striped bordered hover size="sm">
                  <tbody>
                    {user.map((row, i) => (
                      <tr key={i}>
                        <td>
                          <img
                            className="avatar"
                            src={row.avatar ? row.avatar : profile}
                            alt="face"
                          />
                        </td>
                        <td>
                          <span className="pl-2">{row.name}</span>
                        </td>
                        <td> {row.phone ? row.phone : "Not Updated"}</td>
                        <td> {row.email} </td>

                        <td>
                          <button
                            className="click-btn"
                            onClick={() =>
                              navigate(`/view-candidate/${row.id}`)
                            }
                          >
                            View details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>:<img className="not-found" src={notFound}/>}
    </>
  );
}

export default CandidateList;
