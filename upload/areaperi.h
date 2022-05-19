#include<math.h>
#define PI 3.14
#define S(a,b,c) ((a+b+c)/2.0)
#define TRINGLE_AREA(a,b,c) (sqrt(S(a,b,c)*(S(a,b,c)-a)*(S(a,b,c)-b)*(S(a,b,c)-c)))
 #define TRINGLE_PERI(a,b,c) (a+b+c)
#define SQUARE_AREA(x) (x*x)
#define SQUARE_PERI(x) (4*x)
#define CIRCLE_AREA(r) (PI*r*r)
#define CIRCLE_PERI(r) (2*PI*r)
