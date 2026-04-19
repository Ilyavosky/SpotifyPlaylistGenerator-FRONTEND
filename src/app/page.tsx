export default function LoginPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <main className="login">
      <div className="login-g" />
      <div className="login-card">
        <h1 className="login-titulo">JOTARO</h1>
        <p className="login-text">
          Crea tu playlist TUNTUNTUN
        </p>
        <a href={`${apiUrl}/auth/login`} className="login-btn">
          Conectar con Spotify
        </a>
      </div>
    </main>
  );
}
