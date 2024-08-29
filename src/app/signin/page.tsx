import styles from "@/styles/SignIn.module.css";

const SignIn = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your email address"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="type your password"
            required
          />
        </div>

        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignIn;
