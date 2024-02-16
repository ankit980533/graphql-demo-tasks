
#include <cmath>
#include <iostream>
using namespace std;
 

 int max_XOR(int N, int L, int R) {
    int max_XOR_val = 0;
    for (int X = L; X <= R; X++) {
        int XOR_val = N ^ X;
        if (XOR_val > max_XOR_val) {
            max_XOR_val = XOR_val;
        }
    }
    return max_XOR_val;
}
 
// Driver Code
int main()
{
    // int n = 7, l = 2, r = 23;
    
    int l;
    cin>>l;
    int r;
    cin>>r;
int n;
    cin>>n;
    cout << "The output is " << max_XOR(n, l, r);
    return 0;
}