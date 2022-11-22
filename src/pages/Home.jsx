import React, { useEffect } from "react";
import styled from "styled-components";
import ChatScreen from "../components/ChatScreen";
import Loading from "../components/Loading";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import db, { auth } from "../firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hello from "../components/Hello";
const Home = () => {
  const [user, loading] = useAuthState(auth);

  // store user in firebase
  useEffect(() => {
    if (user) {
      setDoc(
        doc(db, "users", user?.uid),
        {
          username: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          lastSeen: serverTimestamp(),
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;
  return (
    <Router>
      <Container>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/chat/:id" element={<ChatScreen />} />
        </Routes>
      </Container>
    </Router>
  );
};

const Container = styled.div`
  display: flex;
`;

export default Home;
