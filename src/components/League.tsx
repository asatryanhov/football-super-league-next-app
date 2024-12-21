import ServerComponent from "@/components/ServerComponent";
export default function League() {
  return (
    <>
      <ServerComponent
        teamName="Barcelona"
        teamValue="987m"
        avarageAge="23.8"
        teamId={2817}
        tournamentId={8}
        seasonId={61643}
      />
      <ServerComponent
        teamName="Man City"
        teamValue="1.2bn"
        avarageAge="28.6"
        teamId={17}
        tournamentId={17}
        seasonId={61627}
      />
    </>
  );
}
