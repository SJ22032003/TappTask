import Register from "./Register";
import Login from "./Login";
import styles from "./styles.module.scss";
import Image from "next/image";
import accessHeroImg from "@/assets/access_img.svg";

function UserAccess({ userType }: TUserAccess) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainAccessContainer}>
        <section className={styles.imageSection}>
          <Image src={accessHeroImg} alt="access hero image" />
        </section>
        <hr className={styles.divider} />
        <section className={styles.formSection}>
          <div className={styles.accessTab}>
            <AccessForm type={userType} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserAccess;

const AccessForm = ({ type }: { type: string }) => {
  switch (type) {
    case "login":
      return <Login />;
    case "register":
      return <Register />;
    default:
      return <Login />;
  }
};

type TUserAccess = {
  userType: string;
};
