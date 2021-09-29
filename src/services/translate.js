import React from "react";
import { FormattedMessage } from "react-intl";

const translate = (id, value={}, defaultMessage) => <FormattedMessage id={id} values={{ ...value }} defaultMessage={defaultMessage}/>

export default translate;