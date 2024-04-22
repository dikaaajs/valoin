import axios from "axios";

// interface Auth {
//   statusAuth : string,
//   session: any
// }

// interface Query {
//   agent: string,
//   map: string,
//   status: string,
//   idMaker: any
// }

// interface SetState {
//   setDataLineup: any,
//   setFilteredLineup: any,
//   setLoading: any,
//   setClientId: any
// }

// interface Option {
//   page: number,
//   viewProfile: boolean
// }

export const getLineup = async (auth, query, setState, option) => {
  const { agent, map, condition, idMaker } = query;
  const { setDataLineup, setFilteredLineup, setLoading, setClientId } =
    setState;
  const { statusAuth, session } = auth;
  const { page, viewProfile } = option;

  let LineupRes;
  try {
    if (agent === undefined && viewProfile === undefined) {
      return setLoading(false);
    }

    // get lineup
    LineupRes = await axios.post("/api/lineup/get", {
      ...query,
      ...option,
      status: condition,
    });

    console.log(agent);

    // get id client
    if (statusAuth === "authenticated") {
      const getId = await axios.post("/api/user/byEmail", {
        email: session.user.email,
      });

      const tmpIdUser = getId.data.user._id;
      setClientId(tmpIdUser);
    }

    setDataLineup(LineupRes.data);
    setFilteredLineup(LineupRes.data.result);
    setLoading(false);
  } catch (error) {
    console.log(error.message);
  }

  return LineupRes;
};
