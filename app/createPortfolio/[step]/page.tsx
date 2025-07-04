import CreatePortfolio from "../page";

interface PageProps {
  params: {
    step: string;
  };
}

export default function CreatePortfolioStepPage({ params }: PageProps) {
  return <CreatePortfolio stepParam={params.step} />;
}
