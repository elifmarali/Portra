import CreatePortfolio from "../page";

interface PageProps {
  params: {
    step: string;
  };
}

export default async function CreatePortfolioStepPage({ params }: PageProps) {
  const {step} = await params;
  return <CreatePortfolio stepParam={step}/>;
}
