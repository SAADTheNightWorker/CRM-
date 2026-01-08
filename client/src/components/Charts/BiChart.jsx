import React from "react";

const REPORT_SRC =
  "https://app.powerbi.com/reportEmbed?reportId=569896dc-654d-43b7-8870-9afd39f874ba&autoAuth=true&ctid=dd8772e5-1b0f-468e-92ae-1a143863bbd7";

const BiChart = () => {
  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <div className="pb-[47.48%]" />
        <iframe
          title="Claimwolf Home Report"
          src={REPORT_SRC}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default BiChart;
