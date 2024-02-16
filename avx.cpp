// CPP program to find the x in range [l, r]
// such that x ^ n is maximum.
#include <cmath>
#include <iostream>
using namespace std;
 
// Function to calculate the maximum value of
// N ^ X, where X is in the range [L, R]
// int maximumXOR(int n, int l, int r)
// {
//     int x = 0;
//     for (int i = log2(r); i >= 0; --i) 
//     {
//         if (n & (1 << i))  // Set bit
//         { 
//             if (x + (1 << i) - 1 < l)
//                 x ^= (1 << i);
//         }
//         else // Unset bit
//         { 
//             if ((x ^ (1 << i)) <= r)
//                 x ^= (1 << i);
//         }
//     }
//     return n ^ x;
// }
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