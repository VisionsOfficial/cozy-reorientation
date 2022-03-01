import React from "react";

import Empty from "cozy-ui/transpiled/react/Empty";
import Card from "cozy-ui/transpiled/react/Card";
import { useI18n } from "cozy-ui/transpiled/react/I18n";
import useBreakpoints from "cozy-ui/transpiled/react/hooks/useBreakpoints";

import MaintenanceSVG from "../../../assets/icons/maintenance.svg";

const WipPage = () => {
  const { t } = useI18n();
  const { isDesktop } = useBreakpoints();
  return (
    <Card className="u-bg-white">
      <Empty
        style={isDesktop ? { margin: "auto" } : {}}
        className={isDesktop ? "u-w-6" : "u-w-100 u-mt-3"}
        icon={MaintenanceSVG}
        iconSize={"large"}
        title={t("Bientôt sur vos écrans...")}
        text={t(
          "... votre bilan d’orientation avec des fonctionnalités de partage, de création de CV et lettres de motivation, des synthèses graphiques pour mieux vous connaitre, la connexion à de nouveaux contenus pédagogiques et sources de données, des notes sur votre recherche de métiers et formations, un catalogue de service pour vous accompagner dans votre orientation ..."
        )}
      />
    </Card>
  );
};
export default WipPage;
