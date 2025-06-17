import React from "react";
import { useForm } from "react-hook-form";

type LoginFormInputs = {
  email: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Dados enviados:", data);
    alert(`Login efetuado com: ${data.email}`);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: 0,
            backgroundColor: "#6C9A5C",
            width: "471px",
            height: "1024px",

          }}
        ></div>

        <div
          style={{
            position: "absolute",
            top: "-24px",
            left: "164px",
            width: "680px",
            height: "1142px",
            backgroundColor: "white",
            borderRadius: "50%",

          }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="/nextExchangeLogo.png"
            alt="Logo"
            style={{
              width: "441px",
              height: "441px",
              marginBottom: "1rem"
            }}
          />

        </div>
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "white",
          position: "relative",
          display: "flex",

          alignItems: "center",
        }}
      >

        <div
          style={{
            position: "absolute",
            right: "0px",
            backgroundColor: "#6C9A5C",
            width: "53px",
            height: "1040px",

          }}
        ></div>

        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "400px",
            width: "601px",
            height: "1170px",
            backgroundColor: "white",
            transform: "rotate(330deg)",
            borderRadius: "50%",

          }}
        ></div>

        <h2
          style={{
            position: "absolute",
            top: "284px",
            left: "-90px",
            color: "black",        
            fontSize: "1rem",       
            fontFamily: "Arial, sans-serif", 
            fontWeight: "bold",     
          }}
        >
          Login
        </h2>
        
        <div
          style={{
            backgroundColor: "#E0E0E0",
            padding: "2rem",
            borderRadius: "8px",
            width: "665px",
            height: "251px",
            zIndex: 1,
            marginLeft: "-100px",
          }}

        >


          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
              <label>Email address</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                style={{
                  width: "100%",
                  padding: "0.6rem",
                  marginTop: "0.25rem",
                  borderRadius: "4px",
                  border: errors.email ? "1px solid red" : "1px solid #ccc",

                }}
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <div style={{ height: '20px', marginTop: '4px' }}>
                {errors.email && (
                  <p style={{ color: "red", fontSize: "0.875rem", margin: 0 }}>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label>Password</label>
              <input
                type="password"
                placeholder="password"
                style={{
                  width: "100%",
                  padding: "0.6rem",
                  marginTop: "0.25rem",
                  borderRadius: "4px",
                  border: errors.password ? "1px solid red" : "1px solid #ccc",
                }}
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "password must be at least 6 characters",
                  },
                })}
              />
              <div style={{ height: '0px', marginTop: '4px' }}>
                {errors.password && (
                  <p style={{ color: "red", fontSize: "0.875rem" }}>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#558B2F",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "2rem",
              }}
            >
              ENTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
