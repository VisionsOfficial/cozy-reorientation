/**
 * Sends an email using the cozy jobs
 *
 * * Example mailData
 *
 *{
 *  mode: "from",
 *  to: [{ name: "NAME", email: "EMAIL" }],
 *  subjects: "SUBJECT",
 *  parts: [{ type: "text/plain", body: "STRING_BODY" }]
 *}
 *
 * @param {CozyClient} client
 * @param {any} mailData
 */
export const sendMail = async (client, mailData) => {
  try {
    const jobCollection = client.collection("io.cozy.jobs");
    const data = await jobCollection.create("sendmail", mailData);
    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};
