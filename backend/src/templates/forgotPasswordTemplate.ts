const forgotPasswordTemplate = (resetLink: string) => {
    return `
    <div
      style="
        font-family: Arial, sans-serif;
        background-color: #f4f4f5;
        padding: 40px;
      "
    >
      <div
        style="
          max-width: 500px;
          margin: auto;
          background: white;
          border-radius: 12px;
          padding: 40px;
        "
      >
        <h1
          style="
            color: #18181b;
            text-align: center;
          "
        >
          Reset Your Password
        </h1>

        <p
          style="
            color: #52525b;
            line-height: 1.6;
          "
        >
          Click below to reset your password.
        </p>

        <div style="text-align:center; margin-top:30px;">
          <a
            href="${resetLink}"
            style="
              background:#2563eb;
              color:white;
              padding:14px 24px;
              border-radius:8px;
              text-decoration:none;
            "
          >
            Reset Password
          </a>
        </div>
      </div>
    </div>
  `;
};

export default forgotPasswordTemplate;