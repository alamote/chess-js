export class PageUtility {

  public static getQuery(): { [name: string]: string } {
    const query = window.location.search.substring(1);
    const queryObj = {};
    query.split('&').forEach(item => {
      const [key, value] = item.split('=');
      queryObj[key] = value;
    });
    return queryObj;
  }
}
