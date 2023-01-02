import React, { createContext, useContext, useEffect, useState } from "react";

type TrackingContextProps = {
  sendTrackingMessage: () => void;
};

const TrackingContext = createContext<TrackingContextProps>(null);

export const TrackingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [trackingSocket, setTrackingSocket] = useState<WebSocket | null>(null);

  // const handleOpenSocket = () => {};

  useEffect(() => {
    const _socket = new WebSocket("ws://localhost:6001/jobs/tracking");

    setTrackingSocket(_socket);
  }, []);

  useEffect(() => {
    if (trackingSocket) {
      trackingSocket.onopen = () => {
        console.log("Tracking socket open");
      };

      trackingSocket.onmessage = (msg) => {
        const msgData = JSON.parse(msg.data);
        console.log(msgData);
      };

      trackingSocket.onclose = () => {
        console.log("Socket is closed");
      };
    }

    return () => {
      trackingSocket?.close(1000, "Closed chat page");
    };
  }, [trackingSocket]);

  const handleSendSocketMessage = () => {
    trackingSocket?.send("Hello bro");
  };

  /* useEffect(() => {
    fetch("http://localhost:6001/jobs/findActive", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        handleOpenSocket();
      });
  }, []); */

  return (
    <TrackingContext.Provider
      value={{ sendTrackingMessage: handleSendSocketMessage }}
    >
      {children}
    </TrackingContext.Provider>
  );
};

export const useTrackingContext = () =>
  useContext<TrackingContextProps>(TrackingContext);
