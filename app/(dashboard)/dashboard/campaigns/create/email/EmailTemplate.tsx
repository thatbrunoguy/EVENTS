"use client";
import React, { useContext, useEffect, useRef } from "react";
import { EmailAdContext } from "./EmailAdsContext";
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import { EventObj } from "@/app/types";

const socials = [
  { title: "facebookLink", icon: <FaFacebookF />, url: "/" },
  { title: "xLink", icon: <FaXTwitter />, url: "/" },
  { title: "linkedinLink", icon: <FaLinkedinIn />, url: "/" },
  { title: "instagramLink", icon: <FaInstagram />, url: "/" },
  { title: "tiktokLink", icon: <FaTiktok />, url: "/" },
  { title: "youtubeLink", icon: <FaYoutube />, url: "/" },
];

const EmailTemplate = () => {
  const { data, mailContent, setData, selectedEvent } =
    useContext(EmailAdContext);
  const emailBodyRef = useRef(null);

  useEffect(() => {
    //@ts-ignore
    const emailBodyHTML = emailBodyRef.current.innerHTML;

    setData((prev: any) => ({ ...prev, html_content: emailBodyHTML }));
  }, [mailContent]);

  return (
    <>
      <div className="w-full flex items-center justify-between mb-9">
        <h2 className="text-[24px] font-semibold ">{data?.name}</h2>
        <button>
          <p className="text-primaryPurple hover:bg-primaryPurple hover:text-white bg-lightPurple h-10  px-5 grid place-content-center rounded-md">
            Send test email
          </p>
        </button>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          fontSize: "14px",
        }}
      >
        <p style={{ marginBottom: "8px" }}>
          <span style={{ color: "#6B7280" }}>Subject:</span> {data?.subject}
        </p>
        <p>
          <span style={{ color: "#6B7280" }}>From: </span>
          {data?.from_email}
        </p>
      </div>
      <div ref={emailBodyRef}>
        <div
          id="emailBody"
          style={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "24px",
            fontSize: "14px",
          }}
        >
          {mailContent.media?.length ? (
            <div style={{ height: "308px", width: "100%" }}>
              <img
                style={{ objectFit: "cover" }}
                src={mailContent?.media[0]}
                alt=""
                width="100%"
                height="100%"
              />
            </div>
          ) : null}

          <div
            style={{
              height: "272px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div style={{ width: "450px" }}>
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: "600",
                  marginBottom: "12px",
                }}
              >
                {mailContent?.emailHeader}
              </h2>
              <p style={{ color: "#6B7280" }}>
                {mailContent?.emailDescription}
              </p>
            </div>
          </div>

          <div>
            <div
              style={{
                width: "100%",
                maxWidth: "550px",
                marginLeft: "auto",
                marginRight: "auto",
                // marginTop: `${index > 0 && "64px"}`,
              }}
            >
              {selectedEvent?.img && (
                <img
                  style={{
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                  //@ts-ignore
                  src={selectedEvent?.img}
                  alt="img"
                  width="550px"
                  height="277px"
                />
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "24px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  borderBottomLeftRadius: "4px",
                  borderBottomRightRadius: "4px",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: "28px",
                      fontWeight: "500",
                      marginBottom: "4px",
                    }}
                  >
                    {selectedEvent?.name}
                  </h2>
                  <p
                    style={{
                      color: "#6B7280",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    {selectedEvent?.address}
                  </p>
                  <p style={{ color: "#6B7280", fontSize: "14px" }}>
                    {selectedEvent?.startDate}
                  </p>
                </div>
                {/* REGISTR BUTTON */}
                <button
                  style={{
                    backgroundColor: "#8B5CF6",
                    display: "grid",
                    placeContent: "center",
                    fontSize: "14px",
                    color: "#FFFFFF",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    borderRadius: "4px",
                  }}
                  onClick={() =>
                    window.location.replace(
                      `https://eventsparrot.com/events/${selectedEvent.id}`
                    )
                  }
                >
                  <p>Register</p>
                </button>
              </div>
            </div>
          </div>

          {mailContent?.selectedEvents?.map(
            (event: EventObj, index: number) => (
              <>
                <div
                  style={{
                    width: "100%",
                    maxWidth: "550px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "64px",
                  }}
                  key={index}
                >
                  <img
                    style={{
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                    //@ts-ignore
                    src={event?.img}
                    alt="Image"
                    width="550px"
                    height="277px"
                  />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "24px",
                      backgroundColor: "#FFFFFF",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      borderBottomLeftRadius: "4px",
                      borderBottomRightRadius: "4px",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          fontSize: "28px",
                          fontWeight: "500",
                          marginBottom: "4px",
                        }}
                      >
                        {event?.name}
                      </h2>
                      <p
                        style={{
                          color: "#6B7280",
                          fontSize: "14px",
                          marginBottom: "4px",
                        }}
                      >
                        {event?.address}
                      </p>
                      <p style={{ color: "#6B7280", fontSize: "14px" }}>
                        {event?.startDate}
                      </p>
                    </div>
                    {/* REGISTR BUTTON */}
                    <button
                      style={{
                        backgroundColor: "#8B5CF6",
                        display: "grid",
                        placeContent: "center",
                        fontSize: "14px",
                        color: "#FFFFFF",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        borderRadius: "4px",
                      }}
                      onClick={() =>
                        window.location.replace(
                          `https://eventsparrot.com/events/${event.id}`
                        )
                      }
                    >
                      <p>Register</p>
                    </button>
                  </div>
                </div>
              </>
            )
          )}

          <footer
            style={{
              backgroundColor: "#FBFAFC",
              width: "100%",
              paddingTop: "20px",
              paddingBottom: "20px",
              color: "#312F33",
              marginTop: "64px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "24px",
                fontSize: "28px",
                color: "#8B5CF6",
              }}
            >
              {socials
                //@ts-ignore
                .filter((s: any) => mailContent[s.title] !== "")
                .map((social, index) => (
                  <div key={index}>
                    <a
                      //@ts-ignore
                      href={mailContent[social.title]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social?.icon}
                    </a>
                  </div>
                ))}
            </div>
            <div
              style={{
                width: "100%",
                maxWidth: "450px",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center",
                marginTop: "32px",
              }}
            >
              <p>{mailContent?.organizersName}</p>
              <p style={{ marginTop: "12px" }}>
                {mailContent?.street}, {mailContent?.city}, {mailContent?.state}
                , {mailContent?.postalCode} {mailContent?.country}
              </p>
              <p>Unsubscribe | Privacy Policy</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default EmailTemplate;
