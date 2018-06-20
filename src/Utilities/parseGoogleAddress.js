export const parseAddress = googAddyOutput => {
  const { formatted_address } = googAddyOutput;
  const [street_number, route, postal_code] = [
    "street_number",
    "route",
    "postal_code"
  ].map(part => {
    try {
      return googAddyOutput.address_components.find(comp =>
        comp.types.find(type => type === part)
      ).short_name;
    } catch (e) {
      return "";
    }
  });
  const address = `${street_number} ${route}`;
  const lat = googAddyOutput.geometry.location.lat();
  const lng = googAddyOutput.geometry.location.lng();
  return { formatted_address, address, lat, lng, zip: postal_code };
};
