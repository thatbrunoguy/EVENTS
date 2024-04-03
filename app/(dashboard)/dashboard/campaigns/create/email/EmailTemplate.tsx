"use client";
import React, { useContext } from "react";
import { EmailAdContext } from "./EmailAdsContext";
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

const socials = [
  { title: "facebook", icon: <FaFacebookF />, url: "/" },
  { title: "x", icon: <FaXTwitter />, url: "/" },
  { title: "linkedin", icon: <FaLinkedinIn />, url: "/" },
  { title: "instagram", icon: <FaInstagram />, url: "/" },
  { title: "tiktok", icon: <FaTiktok />, url: "/" },
  { title: "youtube", icon: <FaYoutube />, url: "/" },
];

const EmailTemplate = () => {
  const { data, mailContent } = useContext(EmailAdContext);

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
        <div style={{ height: "308px", width: "100%", marginTop: "48px" }}>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D"
          />
        </div>

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
              Email Header
            </h2>
            <p style={{ color: "#6B7280" }}>
              Don&apos;t miss out! Fill in the email below with a captivating
              description of these must-attend events.
            </p>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "550px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "4px",
            }}
            src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1lZXRpbmd8ZW58MHx8MHx8fDA%3D"
          />

          {mailContent?.selectedEvents?.map((event) => (
            <>
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
                    Eko convections centre
                  </h2>
                  <p
                    style={{
                      color: "#6B7280",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    Lekki paradise estate 3, chevron drive
                  </p>
                  <p style={{ color: "#6B7280", fontSize: "14px" }}>
                    Saturday, October 22, 2023 | 7:30pm
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
                >
                  <p>Register</p>
                </button>
              </div>
            </>
          ))}

          <div
            style={{
              width: "100%",
              maxWidth: "550px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "64px",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "4px",
              }}
              src="https://plus.unsplash.com/premium_photo-1682608389369-e029b03c80d6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fG1lZXRpbmd8ZW58MHx8MHx8fDA%3D"
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
                  Eko convections centre
                </h2>
                <p
                  style={{
                    color: "#6B7280",
                    fontSize: "14px",
                    marginBottom: "4px",
                  }}
                >
                  Lekki paradise estate 3, chevron drive
                </p>
                <p style={{ color: "#6B7280", fontSize: "14px" }}>
                  Saturday, October 22, 2023 | 7:30pm
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
              >
                <p>Register</p>
              </button>
            </div>
          </div>

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
              {/* Assuming `socials` is an array of objects with `icon` as an image or SVG */}
              {/* You should replace `social.icon` with appropriate JSX */}
              {socials.map((social, index) => (
                <div key={index}>
                  {/* Replace `social.title` with the proper value */}
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
              <p>The ROI Team</p>
              <p style={{ marginTop: "12px" }}>
                {mailContent.street} {mailContent.state}{" "}
                {mailContent?.postalCode} {mailContent?.country}
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
