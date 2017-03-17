// const tBlack = 'rgba(0,0,0,0.7)';
const tWhite = (color: number, opacity: number) => `rgba(${color},${color},${color},${opacity})`;

const styles = {
  hover: {
    border: `1px solid ${tWhite(255, 0.3)}`,
    color: tWhite(255, 0.4),
    // opacity: 0.95
  },
  link: {

    color: tWhite(255, 0.1),
    border: `1px solid ${tWhite(255, 0.1)}`,
    borderRadius: 2,
    display: 'flex',

    flexFlow: 'row nowrap',
    alignItems: 'center',
    padding: '4px 1em',
    maxWidth: 100,
    fontSize: 14,

    position: 'fixed',
    top: 20,
    right: 20,
    transition: 'all .5s ease',

    // opacity: 0.8,
  },
};



export default styles;
