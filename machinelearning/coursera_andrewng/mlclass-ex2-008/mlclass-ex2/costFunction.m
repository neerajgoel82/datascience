function [J, grad] = costFunction(theta, X, y)
%COSTFUNCTION Compute cost and gradient for logistic regression
%   J = COSTFUNCTION(theta, X, y) computes the cost of using theta as the
%   parameter for logistic regression and the gradient of the cost
%   w.r.t. to the parameters.

% Initialize some useful values
m = length(y); % number of training examples

% You need to return the following variables correctly 
J = 0;
grad = zeros(size(theta));

% ====================== YOUR CODE HERE ======================
% Instructions: Compute the cost of a particular choice of theta.
%               You should set J to the cost.
%               Compute the partial derivatives and set grad to the partial
%               derivatives of the cost w.r.t. each parameter in theta
%
% Note: grad should have the same dimensions as theta
%

%Generating the cost of the hypothesis function
hThetaX = sigmoid(X*theta);
costMatrix = -(y .* log(hThetaX)) - ((1 - y) .* log( 1 - hThetaX));
delta = sum (costMatrix);
J = (1 / m ) * delta;

%Generating gradient
%This will generate vector for errors based on theta. It will generate a m * 1 matrix
diffVector = hThetaX - y;

%This is the variable to store the diff vector transpose multiplied by X. This will generate 1 * n matrix.
diffVectorX = diffVector' * X;

 %Transpose for the above generated vector. This will generate n * 1 matrix
diffVectorXTranspose = diffVectorX';
grad = (diffVectorXTranspose./m);

% =============================================================

end
